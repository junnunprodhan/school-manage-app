use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum Error {
    // Global
    Create { name: String },
    Update { name: String },
    Add { name: String },
    Get { name: String },
    Gets { name: String },
    NotFound { name: String },
    // Database
    DatabaseConnection,
    DatabaseCreate,
    // Auth
    Login,
    Signup,
    // Token
    InvalidToken
}

pub type Result<T> = core::result::Result<T, Error>;
