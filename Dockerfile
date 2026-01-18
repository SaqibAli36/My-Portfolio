# Use official Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy app files
COPY . .

# Expose default Flask port (Railway uses $PORT env variable)
EXPOSE 5000

# Run Flask app using Railway's $PORT if available
CMD ["sh", "-c", "python app.py"]
