import os
import json
import re
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=API_KEY)


def process_user_message(user_message, current_form_data, chat_history=None) -> dict:
    """
    This function processes the user's message and the current form data to generate a response
    :param user_message:
    :param current_form_data:
    :param chat_history: it is the user side of messages, so previous messages from the user
    :return:
    """
    model = genai.GenerativeModel("gemini-2.0-flash")

    # FIXME
    # Here we have a history of the conversation with the user as a list of dictionaries.
    # IT IS NOT RECOMMENDED TO USE ON PRODUCTION.
    # I would highly recommend using a database to store the history of the conversation with the
    # user. And implement token bucket or some other form of rate limiting to avoid token context window overflows.
    # Considering this is only a demo for recruitment purposes, I will not implement this along with auth for
    # frontend which I would do normally in an app like this one.
    if chat_history is None:
        chat_history = []

    # Format chat history for the prompt
    formatted_history = ""
    if chat_history:
        formatted_history = "Previous conversation:\n"
        for entry in chat_history:
            if entry['sender'] == 'user':
                formatted_history += f"User: {entry['message']}\n"
            else:
                formatted_history += f"Assistant: {entry['message']}\n"
        formatted_history += "\n"

    required_fields = ['first_name', 'last_name', 'email', 'reason_of_contact', 'urgency']
    empty_fields = [field for field in required_fields if not current_form_data.get(field)]

    prompt = f"""
    You are a helpful assistant filling out a helpdesk form. Your job is to proactively ask questions 
    to collect all required information. Be conversational and friendly, but focused on completing the form.
    In the response dont use formatting like "" or ''. Unless the situation requires it.
    You dont have to answer with Hi or hello or thanks for contacting us. It is not needed.
    
    The form has these fields:
    - First name (max 20 characters)
    - Last name (max 20 characters)
    - Email (valid format)
    - Reason of contact (max 100 characters, min 10/15 characters) - IMPORTANT: Discuss this in detail, ask follow-up questions to get a detailed reason for contact.
    - Urgency (integer, from 1-10)
    
    There is no need to ask user to stay in bounds of the field limits. Dont even mention it to them unless they will complain about the length of the reason of contact. 
    It is your job to input compressed and valid data within the limits.
    
    Current form state:
    First name: {current_form_data.get('first_name', 'Not provided')}
    Last name: {current_form_data.get('last_name', 'Not provided')}
    Email: {current_form_data.get('email', 'Not provided')}
    Reason of contact: {current_form_data.get('reason_of_contact', 'Not provided')}
    Urgency: {current_form_data.get('urgency', 'Not provided')}
    
    Current history of the conversation with the user:
    {formatted_history}

    User message: {user_message}
    
    IMPORTANT:
    It is advised to use the history of the conversation with the user to get the context of the conversation or more information for u to add to the form.
    Example: in the first message the user might say "I have a problem with my order" and in the next message they might say "I want to cancel it". Or "I have a CPU issue" and then "it overheats, over 100 deg", so the final message for the reason of contact would be "Cpu issues, user saw the spikes in the temperatur in the ranges of 100 degrees, major overheating." 
    So u take the two information and add it to the form to the "reason_of_contact" field in a proper way with professional language, like a report for a technician.
    If the user provides some new information later on add it as well. Look at the formatted history of the conversation with the user. 
    Example: "I have also noticed the ram is not working properly" - add it to the reason of contact field. Always double check the reason of contact field and the current history to see whether u updates the filed correctly. 
    
    
    Empty fields that still need to be filled: {', '.join(empty_fields) if empty_fields else 'All fields are filled'}
    
    Instructions:
    1. If this is the first message and no fields are filled, introduce yourself and ask for the user's first name.
    2. If there are still empty fields, focus on getting information for the next empty field.
    3. For the "reason_of_contact" field, ask follow-up questions to get detailed information, WE ARE NOT satisfied with short answers like: "Cpu hot" etc we need detailed and technical answer so change the user message into professional description.
    4. If all fields are filled, ask the user to confirm if everything is correct and offer to make changes if needed.
    5. Always extract any form field information from the user's response. Write it into the form with professional language.
    6. If the user provides information for multiple fields at once, update the form data accordingly.
    7. If user provides different information for the form throughout the conversation, ask them to confirm which one is correct and THEN UPDATE THE FORM WITH THE RIGHT ONE.
    8. You ALWAYS END THE MESSAGE WITH A QUESTION. WHEN ALL THE FIELDS ARE FILLED, ASK THE USER IF THEY WANT TO MAKE ANY CHANGES OR IF THEY ARE SATISFIED WITH THE FORM.
    
    IMPORTANT:
    Sometimes the user might give u the first and last name in one message like "My name is Jan Kowalski" where the first_name: is Jan and the last_name: Kowalski. Then add both to the form and ask in the next message, asking about other fields, whether the names are correct.
    
    Always include any form field data you've identified in JSON format at the end of your response.
    Use this exact format without substitutions:
    [FORM_DATA]{{fields_as_json_object}}[/FORM_DATA]
    
    For example, if you detect a first name 'Jan', include:
    [FORM_DATA]{{"first_name": "Jan"}}[/FORM_DATA]
    """
    print("Current chat history:" + str(chat_history))

    # Get a response from Gemini
    response = model.generate_content(prompt)
    response_text = response.text

    # Extract the data if present
    form_updates = {}
    form_data_match = re.search(r'\[FORM_DATA\](.*?)\[/FORM_DATA\]', response_text, re.DOTALL)
    if form_data_match:
        form_data_str = form_data_match.group(1)  # Extract the JSON string
        try:
            form_updates = json.loads(form_data_str)  # Parse the JSON string

        except json.JSONDecodeError:
            print("Failed to decode JSON from the response.")
            pass

    # Remove the form data part from the response text
    clean_response = re.sub(r'\[FORM_DATA\].*?\[/FORM_DATA\]', '', response_text, flags=re.DOTALL).strip()

    return {
        'ai_response': clean_response,
        'form_updates': form_updates
    }


def get_initial_message() -> str:
    model = genai.GenerativeModel("gemini-2.0-flash")

    prompt = """
    You are a helpful assistant filling out a helpdesk form. Create a friendly introduction 
    that explains you'll be helping the user fill out a helpdesk request form.
    
    Your introduction should:
    1. Be welcoming and professional
    2. Briefly explain the purpose of the form
    3. Ask for the user's first name to begin
    
    Keep it concise and friendly. 
    Just type the introduction without any additional information, signage like "" etc. 
    """

    response = model.generate_content(prompt)
    return response.text
