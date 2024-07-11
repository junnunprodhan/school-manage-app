use crate::database::{Id, Text, Int};
use serde::{Serialize, Deserialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct ExamSubject {
    pub id: Id,
    pub objective_mark: Int,
    pub subjective_mark: Int,
    pub practical_mark: Int,
    pub subject_id: Id,
    pub exam_id: Id,
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct ExamSubjectWithSubject {
    pub id: Id,
    pub objective_mark: Int,
    pub subjective_mark: Int,
    pub practical_mark: Int,
    pub subject_id: Id,
    pub exam_id: Id,
    pub subject_name: Option<Text>,
    pub subject_code: Option<Text>
}