import axios, { AxiosResponse } from "axios";

interface Task {
  name: string;
  tasks: {
    description: string;
    value: number;
    checked: boolean;
  }[];
}

export async function getData(): Promise<Task[]> {
  const apiUrl = window.encodeURI(
    "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress"
  );

  try {
    const response: AxiosResponse<Task[]> = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
