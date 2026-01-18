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

# Copy the rest of the app
COPY . .

# Expose the port
EXPOSE 5000

# Run Gunicorn with 4 workers, bind to 0.0.0.0:$PORT
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
