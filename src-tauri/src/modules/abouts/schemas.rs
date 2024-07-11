use crate::database::{Id, Text};
use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct About {
    pub id: Id,
    pub birth: Text,
    pub gender: Option<Text>,
    pub address: Text,
    pub number: Text,
    pub email: Text,
    pub password: Text,
}
