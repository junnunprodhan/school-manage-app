use crate::database::{Id, Text};
use serde::{Serialize, Deserialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct Class {
    pub id: Id,
    pub name: Text,
}