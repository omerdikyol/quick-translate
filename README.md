# QuickTranslate

QuickTranslate is a real-time translation application built with FastAPI for the backend and React Native for the mobile application. It utilizes Hugging Face's machine learning models to translate text between multiple languages.

## Features

- **Real-Time Translation**: Translate text between various language pairs using Hugging Face models.
- **Contextual Understanding**: Maintains conversation context for more accurate translations.
- **Offline Mode (Upcoming)**: Plans to support offline translation using pre-downloaded models.
- **Multi-Language Support**: Currently supports English, French, Spanish, German, Chinese, and Turkish.

## Technology Stack

- **Backend**: FastAPI, Python
- **Frontend**: React Native
- **API**: Hugging Face Inference API
- **State Management**: React Hooks

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- Hugging Face API Key (You need to create a `.env` file with your Hugging Face API Key)

## Setup and Installation

### Backend

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/quicktranslate.git
    cd quicktranslate/backend
    ```

2. **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Create a `.env` file**:
    ```bash
    touch .env
    ```
    Add your Hugging Face API key:
    ```
    HF_API_KEY=your_hugging_face_api_key
    ```

5. **Run the FastAPI Server**:
    ```bash
    uvicorn main:app --reload
    ```

### Mobile Application

1. **Navigate to the Mobile App Directory**:
    ```bash
    cd quicktranslate/mobile
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the Mobile Application**:
    ```bash
    expo start
    ```

4. **Configure API URL**:
    - Make sure to update the API URL in the React Native app to match your backend server's IP address.

## Usage

1. Open the mobile app.
2. Select the source and target languages from the dropdowns.
3. Enter the text you wish to translate.
4. Press the "Translate" button to see the translation.

## Screenshots

![image](https://github.com/user-attachments/assets/338db944-ebcc-4545-8f9f-5d8072f8174c)

![image](https://github.com/user-attachments/assets/64690cb6-4a00-4d80-ad8e-4056a9483602)

![image](https://github.com/user-attachments/assets/6eff414d-037e-4ff0-8375-771305e14a17)



## Roadmap

- **Offline Mode**: Implement offline translation using pre-downloaded models.
- **Language Expansion**: Support additional language pairs.
- **UI Improvements**: Enhance the user interface and user experience.

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss any changes or enhancements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to [Hugging Face](https://huggingface.co/) for providing powerful NLP models.
- Thanks to the React Native and FastAPI communities for their excellent tools and documentation.
