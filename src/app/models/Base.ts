export abstract class Base {
  protected _id!: string;

  public toJSON() {
    // a lógica de execução vai ficar nas subclasses.
  }
}
