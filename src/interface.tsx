export interface  todoObject { name: string,isNested:boolean,completed:boolean, description: string }

export interface CurrentContextType {
    todo: todoObject[];
    setTodo:(props?:any)=>void
    UserName:string;
    setUserName:(props?:any)=>void
  }