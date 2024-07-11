use super::super::{abouts, schools};
use super::schemas::{AuthUserReply, AuthReply};
use crate::database::{Connection, Id};
use crate::error::{Error, Result};
use crate::libs::token;

pub async fn signup(
    connection: &Connection,
    //
    name: &str,
    img: &str,
    // about
    birth: &str,
    gender: &str,
    address: &str,
    number: &str,
    // login
    email: &str,
    password: &str,
) -> Result<AuthReply> {
    // TODO: Implement password hashing.
    let about_id =
        abouts::services::create_about(connection, birth, gender, address, number, email, password)
            .await?;

    let school_id = schools::services::create_school(connection, name, img, about_id).await?;

    let token = token::generate_token("ADMIN", &name, school_id);

    Ok(AuthReply { token, school_id})
}

pub async fn login(
    connection: &Connection,
    user_type: &str,
    _school_id: Option<Id>,
    email: &str,
    password: &str,
) -> Result<AuthReply> {
    if user_type != "ADMIN" {
        return Err(Error::Create {
            name: "Login".to_string(),
        });
    }

    let about = abouts::services::get_about_by_email(connection, email).await?;

    // TODO: Implement password hash maching.
    if about.password != password {
        return Err(Error::Get {
            name: "login".to_string(),
        });
    }

    let school = schools::services::get_school_by_about_id(connection, about.id).await?;

    let token = token::generate_token(&user_type, &school.name, school.id);

    Ok(AuthReply { token, school_id: school.id })
}

pub async fn auth_user(
    connection: &Connection,
    token: &str
) -> Result<AuthUserReply> {
    let payload = token::parse_token(token).map_err(|_| Error::InvalidToken)?;
    if payload.user_type != "ADMIN" {
        return Err(Error::InvalidToken);
    }

    let school = schools::services::get_school(connection, payload.school_id).await.map_err(|_| Error::InvalidToken)?;

    Ok(AuthUserReply { name: payload.name, img: school.img.unwrap_or_default(), school_id: school.id })
}