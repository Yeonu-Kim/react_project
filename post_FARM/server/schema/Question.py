import datetime
from pydantic import BaseModel, field_validator
from .Answer import Answer
from .User import User

class Question(BaseModel):
    id: int
    subject: str
    content: str
    create_date: datetime.datetime
    modify_date: datetime.datetime | None = None
    answers: list[Answer] = []
    voter: list[User] = []
    user: User | None

class QuestionCreate(BaseModel):
    subject: str
    content: str

    @field_validator('subject', 'content')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 값은 허용되지 않습니다.')
        return v
    
class QuestionList(BaseModel):
    total: int = 0
    question_list: list[Question] = []

class QuestionUpdate(QuestionCreate):
    question_id: int

class QuestionDelete(BaseModel):
    question_id: int

class QuestionVote(BaseModel):
    question_id: int