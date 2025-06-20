from flask import Flask, request, jsonify, send_from_directory
import os
import json
from datetime import datetime
from docx import Document

app = Flask(__name__)

def create_word_document(data):
    """Create a Word document with the message data"""
    doc = Document()

    # Add header
    header = doc.add_heading('Portfolio Contact Message', 0)

    # Add timestamp
    doc.add_paragraph(f"Received: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    doc.add_paragraph("")

    # Add sender information
    doc.add_heading('Sender Information', level=1)
    doc.add_paragraph(f"Name: {data['name']}")
    doc.add_paragraph(f"Email: {data['email']}")
    doc.add_paragraph(f"Subject: {data.get('subject', 'No subject')}")
    doc.add_paragraph("")

    # Add message content
    doc.add_heading('Message Content', level=1)
    doc.add_paragraph(data['message'])

    # Save document
    filename = f"message_{datetime.now().strftime('%Y%m%d_%H%M%S')}.docx"
    doc.save(filename)
    return filename

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        data = request.get_json()

        # Validate required fields
        if not all(key in data for key in ['name', 'email', 'message']):
            return jsonify({'success': False, 'error': 'Missing required fields'})

        # Create Word document
        filename = create_worddocument(data)

        # Save to JSON file as backup
        backup_data = {
            'timestamp': datetime.now().isoformat(),
            'data': data,
            'word_file': filename
        }

        backup_filename = f"messages_backup.json"
        messages = []
        if os.path.exists(backup_filename):
            with open(backup_filename, 'r', encoding='utf-8') as f:
                messages = json.load(f)

        messages.append(backup_data)

        with open(backup_filename, 'w', encoding='utf-8') as f:
            json.dump(messages, f, ensure_ascii=False, indent=2)

        return jsonify({
            'success': True, 
            'message': 'Message received and saved successfully!',
            'word_file': filename
        })

    except Exception as e:
        print(f"Error processing message: {e}")
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)