import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchInput from ".";
import { HomeContextProvider } from "../../../../context";
import { TaskTable } from "../../../Table";

import type { Task } from "../../../../types";

const tasks: Task[] = [
	{
		id: "task1",
		task: "Tarefa 1",
		completed: false,
		createdAt: "2023-01-01T00:00:00.000Z",
	},
	{
		id: "task2",
		task: "Tarefa 2",
		completed: true,
		createdAt: "2023-01-02T00:00:00.000Z",
	},
	{
		id: "task3",
		task: "Tarefa 3",
		completed: false,
		createdAt: "2023-01-03T00:00:00.000Z",
	},
];

describe("SearchInput", () => {
	it("Deve buscar uma tarefa", async () => {
		render(
			<HomeContextProvider tasks={tasks}>
				<SearchInput />
				<TaskTable />
			</HomeContextProvider>,
		);

		const searchInput = screen.getByPlaceholderText(
			"Busque tarefas...",
		) as HTMLInputElement;

		fireEvent.change(searchInput, { target: { value: "Tarefa 1" } });

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
		});

		expect(searchInput.value).toBe("Tarefa 1");

		expect(screen.getByText("Tarefa 1")).toBeInTheDocument();

		expect(screen.queryByText("Tarefa 2")).not.toBeInTheDocument();
		expect(screen.queryByText("Tarefa 3")).not.toBeInTheDocument();
	});

	it("Deve encontrar nenhuma tarefa", async () => {
		render(
			<HomeContextProvider tasks={tasks}>
				<SearchInput />
				<TaskTable />
			</HomeContextProvider>,
		);

		const searchInput = screen.getByPlaceholderText(
			"Busque tarefas...",
		) as HTMLInputElement;

		fireEvent.change(searchInput, { target: { value: "Tarefa inexistente" } });

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
		});

		expect(searchInput.value).toBe("Tarefa inexistente");

		expect(
			screen.getByText("Nenhuma tarefa foi encontrada."),
		).toBeInTheDocument();

		expect(screen.queryByText("Tarefa 1")).not.toBeInTheDocument();
		expect(screen.queryByText("Tarefa 2")).not.toBeInTheDocument();
		expect(screen.queryByText("Tarefa 3")).not.toBeInTheDocument();
	});
});
