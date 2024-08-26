from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

app = FastAPI()

# Load the Hugging Face API Key from environment variables
load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")

# Supported language pairs and their respective models
language_pairs = {
    ("en", "fr"): "Helsinki-NLP/opus-mt-en-fr",
    ("en", "es"): "Helsinki-NLP/opus-mt-en-es",
    ("en", "de"): "Helsinki-NLP/opus-mt-en-de",
    ("en", "zh"): "Helsinki-NLP/opus-mt-en-zh",
    ("en", "tr"): "Helsinki-NLP/opus-tatoeba-en-tr",
    ("fr", "en"): "Helsinki-NLP/opus-mt-fr-en",
    ("fr", "es"): "Helsinki-NLP/opus-mt-fr-es",
    ("fr", "de"): "Helsinki-NLP/opus-mt-fr-de",
    ("fr", "tr"): "Helsinki-NLP/opus-mt-fr-tr",
    ("es", "en"): "Helsinki-NLP/opus-mt-es-en",
    ("es", "fr"): "Helsinki-NLP/opus-mt-es-fr",
    ("es", "de"): "Helsinki-NLP/opus-mt-es-de",
    ("es", "tr"): "Helsinki-NLP/opus-mt-es-tr",
    ("de", "en"): "Helsinki-NLP/opus-mt-de-en",
    ("de", "fr"): "Helsinki-NLP/opus-mt-de-fr",
    ("de", "es"): "Helsinki-NLP/opus-mt-de-es",
    ("de", "tr"): "Helsinki-NLP/opus-mt-de-tr",
    ("tr", "en"): "Helsinki-NLP/opus-mt-tr-en",
    ("tr", "fr"): "Helsinki-NLP/opus-mt-tr-fr",
    ("tr", "es"): "Helsinki-NLP/opus-mt-tr-es",
    ("tr", "de"): "Helsinki-NLP/opus-mt-tr-de",
}

headers = {
    "Authorization": f"Bearer {HF_API_KEY}"
}

# Pydantic model for the request body
class TranslationRequest(BaseModel):
    text: str
    src_lang: str
    tgt_lang: str
    mode: str = "online"  # Default to online mode
    conversation_id: str = None  # Optional conversation ID for context

@app.get("/")
def read_root():
    return {"message": "Welcome to QuickTranslate API"}

@app.post("/translate/")
async def translate_text(request: TranslationRequest):
    try:
        lang_pair = (request.src_lang, request.tgt_lang)
        if lang_pair not in language_pairs:
            raise HTTPException(status_code=400, detail="Unsupported language pair.")
        
        model_name = language_pairs[lang_pair]
        api_url = f"https://api-inference.huggingface.co/models/{model_name}"

        if request.mode == "online":
            # Online translation using Hugging Face Inference API
            response = requests.post(
                api_url,
                headers=headers,
                json={"inputs": request.text.strip()}
            )
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.json())
            translated_text = response.json()[0]["translation_text"]
        else:
            # Implement offline mode translation (to be added later)
            translated_text = offline_translate(request.text, request.src_lang, request.tgt_lang)
        
        return {"translated_text": translated_text}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def offline_translate(text, src_lang, tgt_lang):
    # Implement offline translation using pre-downloaded models
    # This function will be expanded in later steps
    return "Offline mode translation not implemented yet."

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
