use crate::database::{Id, Text};
use serde::{Serialize, Deserialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct Exam {
    pub id: Id,
    pub name: Text,
    pub started: Text,
    pub class_id: Id,
    pub school_id: Id
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct ExamWithClass {
    pub id: Id,
    pub name: Text,
    pub started: Text,
    pub class_id: Id,
    pub school_id: Id,
    pub class_name: Option<Text>,
}
