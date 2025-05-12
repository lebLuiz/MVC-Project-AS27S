export default interface Category<T_id = string | undefined> {
  id: T_id;
  name: string;
  description: string;
}
