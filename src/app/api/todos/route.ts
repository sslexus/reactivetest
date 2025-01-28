import { NextResponse } from "next/server";

let todos: any = [
  { id: "1", title: "Learn Next.js", completed: false },
  { id: "2", title: "Build a project", completed: true },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTodo = {
    id: Math.random().toString(),
    title: body.title,
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Todo deleted" });
}
