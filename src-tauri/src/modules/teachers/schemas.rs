use crate::database::{Id, Text};
use serde::{Serialize, Deserialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct Teacher {
    pub id: Id,
    pub name: Text,
    pub img: Option<Text>,
    pub about_id: Id,
}
