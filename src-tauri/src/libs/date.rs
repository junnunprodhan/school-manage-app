#![allow(dead_code)]

pub struct CustomDate {
  day: usize,
  month: usize,
  year: usize,
}

impl CustomDate {
  pub fn new(day: usize, month: usize, year: usize) -> Self {
    Self { day, month, year }
  }

  pub fn year(&self) -> usize {
    self.year
  }

  /// Pad Day
  /// 
  /// Padded Day
  /// 
  /// input: 5, output: 05,
  /// input: 11, output: 11,
  pub fn pad_day(&self) -> String {
    pad_usize(self.day, 2, "0")
  }

  /// Pad Month
  /// 
  /// Padded month
  /// 
  /// input: 5, output: 05,
  /// input: 11, output: 11,
  pub fn pad_month(&self) -> String {
    pad_usize(self.month, 2, "0")
  }
}

fn pad_usize(value: usize, len: usize, with: &str) -> String {
  let mut value = format!("{value}");

  if value.len() < len {
    let mut padding = String::new();

    for _i in value.len()..len {
      padding.push_str(&with);
    }
    value =  format!("{padding}{value}");

    value
  } else {
    value
  }
}