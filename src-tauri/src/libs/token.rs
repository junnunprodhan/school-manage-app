use crate::database::Id;
use crate::error::{Error, Result};

pub struct TokenPayload {
  pub user_type: String,
  pub name: String,
  pub school_id: Id,
}

const TOKEN_SEP: &str = "-+-+-+-";

pub fn generate_token(user_type: &str, name: &str, school_id: Id) -> String {
  format!("{user_type}{TOKEN_SEP}{name}{TOKEN_SEP}{school_id}")
}

pub fn parse_token(token: &str) -> Result<TokenPayload> {
  let values = token.split(TOKEN_SEP).collect::<Vec<&str>>();

  if values.len() < 3 {
    return Err(Error::InvalidToken)
  }

  let user_type = values[0].to_string();
  let name = values[1].to_string();
  let school_id = values[2].parse::<Id>().map_err(|_| Error::InvalidToken)?;

  Ok(TokenPayload { user_type, name, school_id })
}