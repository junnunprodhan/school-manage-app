pub struct Config {
  pub database_filename: String
}

impl Config {
  pub fn new() -> Self {
    Self {
      database_filename: "sqlite://database.db".to_string(),
    }
  }
}