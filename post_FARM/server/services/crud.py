from datetime import datetime

from sqlalchemy.orm import Session

from models.Question import Question, Answer
from models.User import User
from schema.Answer import AnswerCreate, AnswerUpdate
from schema.Question import QuestionCreate, QuestionUpdate

def get_question_list(db: Session, skip: int = 0, limit: int = 10):
    _question_list = db.query(Question).order_by(Question.create_date.desc())

    total = _question_list.count()
    question_list = _question_list.offset(skip).limit(limit).all()
    return total, question_list

def get_question(db: Session, question_id: int):
    question = db.query(Question).get(question_id)
    return question

def get_answer(db: Session, answer_id: int):
    answer = db.query(Answer).get(answer_id)
    return answer

def create_answer(db: Session, question: Question, answer_create: AnswerCreate, user: User):
    new_answer = Answer(question = question, content= answer_create.content, create_date=datetime.now(), user=user)
    db.add(new_answer)
    db.commit()

def create_question(db: Session, question_create: QuestionCreate, user: User):
    new_question = Question(subject=question_create.subject, content=question_create.content, create_date=datetime.now(), user=user)
    db.add(new_question)
    db.commit()

def update_question(db: Session, db_question: Question, question_update: QuestionUpdate):
    db_question.subject = question_update.subject
    db_question.content = question_update.content
    db_question.modify_date = datetime.now()
    db.add(db_question)
    db.commit()

def delete_question(db: Session, db_question: Question):
    db.delete(db_question)
    db.commit()

def update_answer(db: Session, db_answer: Answer, answer_update: AnswerUpdate):
    db_answer.content = answer_update.content
    db_answer.modify_date = datetime.now()
    db.add(db_answer)
    db.commit()

def delete_answer(db: Session, db_answer: Answer):
    db.delete(db_answer)
    db.commit()

def vote_question(db: Session, db_question: Question, db_user: User):
    db_question.voter.append(db_user)
    db.commit()

def vote_answer(db: Session, db_answer: Answer, db_user: User):
    db_answer.voter.append(db_user)
    db.commit()