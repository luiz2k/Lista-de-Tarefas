import { getAllTasks } from "./actions";
import { CreateTask } from "./components/CreateTask";
import { Filter } from "./components/Filter";
import { Header } from "./components/Header";
import { TaskTable } from "./components/Table";
import { HomeContextProvider } from "./context";

export async function HomePage() {
	const tasks = await getAllTasks();

	return (
		<HomeContextProvider tasks={tasks.data}>
			<Header />

			<main className="p-5 space-y-5 max-w-7xl m-auto">
				<Filter />
				<CreateTask />
				<TaskTable />
			</main>
		</HomeContextProvider>
	);
}
