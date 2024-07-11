export class CustomFileReader {
  static read(file: File, cb: (data: string) => void) {
    const filereader = new FileReader();

    filereader.addEventListener("load", () => cb(filereader.result?.toString()!));

    filereader.readAsDataURL(file);
  }
}