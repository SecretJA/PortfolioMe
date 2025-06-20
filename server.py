
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
import json
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import docx
from docx import Document

app = Flask(__name__)
CORS(app)

# Email configuration (you'll need to set these in Secrets)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "pphamhoanggiabao19092004@gmail.com"
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD', '')  # Add this to Secrets

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        data = request.json
        
        # Save message to Word document
        save_message_to_word(data)
        
        # Send email notification
        if EMAIL_PASSWORD:
            send_email_notification(data)
        
        return jsonify({'status': 'success', 'message': 'Message sent successfully'})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

def save_message_to_word(data):
    filename = 'portfolio_messages.docx'
    
    # Create or load existing document
    if os.path.exists(filename):
        doc = Document(filename)
    else:
        doc = Document()
        doc.add_heading('Portfolio Contact Messages', 0)
    
    # Add new message
    doc.add_heading('Tin nhắn mới', level=1)
    doc.add_paragraph(f"Thời gian: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
    doc.add_paragraph(f"Tên: {data['name']}")
    doc.add_paragraph(f"Email: {data['email']}")
    doc.add_paragraph(f"Tiêu đề: {data['subject']}")
    doc.add_paragraph(f"Nội dung:")
    doc.add_paragraph(data['message'])
    doc.add_paragraph("-" * 50)
    
    # Save document
    doc.save(filename)
    print(f"Message saved to {filename}")

def send_email_notification(data):
    if not EMAIL_PASSWORD:
        return
    
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = EMAIL_ADDRESS
    msg['Subject'] = f"Portfolio Contact: {data['subject']}"
    
    body = f"""
    Bạn có tin nhắn mới từ portfolio:
    
    Tên: {data['name']}
    Email: {data['email']}
    Tiêu đề: {data['subject']}
    
    Nội dung:
    {data['message']}
    
    ---
    Gửi lúc: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}
    """
    
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, text)
        server.quit()
        print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
