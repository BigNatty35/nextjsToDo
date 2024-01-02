import Link from 'next/link';
import { prisma } from './db';
import { TodoItem } from '@/components/TodoItem';
import { redirect } from 'next/navigation';


// prisma.todo.create({ data: {title: "test", complete: false}}) 
// this is how to manually create data in the DB with prisma

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"
  await prisma.todo.update({where: {id}, data: {complete}})
  console.log(id,complete)
}

async function deleteTodo(id: string, title: string) {
  "use server"
  await prisma.todo.delete({where: {id}})
  console.log(`Successfully deleted ${title}`)
  await prisma.$disconnect();
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl">Todos</h1>
        <Link className='border border-slate-300 text-slate-300
         px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none' href='/new'>
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        ))}
      </ul>
    </>   
  )
 
}