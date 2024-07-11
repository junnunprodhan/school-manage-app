use crate::database::{Id, Text};
use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct Student {
    pub id: Id,
    pub name: Text,
    pub img: Option<Text>,
    pub about_id: Id,
}