use crate::database::Id;
use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct AuthReply {
    pub token: String,
    pub school_id: Id,
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct AuthUserReply {
    pub name: String,
    pub img: String,
    pub school_id: Id,
}
