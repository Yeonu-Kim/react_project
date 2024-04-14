from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.question import router as question_router
from routes.answer import router as answer_router

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(question_router)
app.include_router(answer_router)

@app.get('/hello')
async def hello():
    return {"message": "Hello World!"}