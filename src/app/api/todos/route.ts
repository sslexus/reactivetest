import { NextResponse } from "next/server";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const todos: Todo[] = [
  { id: "1", title: "Learn Next.js", completed: false },
  { id: "2", title: "Build a project", completed: true },
];

export async function GET() {
  // Intentionally adding delay to test loading states
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

// Intentionally broken DELETE endpoint
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // Bug: This doesn't actually filter the array
  todos.splice(
    todos.findIndex((todo) => todo.id === id),
    1
  );

  return NextResponse.json({ message: "Todo deleted" });
}
