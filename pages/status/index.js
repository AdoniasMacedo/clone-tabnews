import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <h2>Database</h2>
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedTextAt = "Carregando...";

  if (!isLoading && data) {
    updatedTextAt = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedTextAt}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseVersion = "Carregando...";
  let maxConnections = "Carregando...";
  let openConnections = "Carregando...";

  if (!isLoading && data) {
    databaseVersion = data.dependencies.database.version;
    maxConnections = parseInt(data.dependencies.database.max_connections);
    openConnections = parseInt(data.dependencies.database.opened_connections);
  }

  return (
    <>
      <div>Versão do Banco de Dados: {databaseVersion}</div>
      <div>Conexões Máximas: {maxConnections}</div>
      <div>Conexões Abertas: {openConnections}</div>
    </>
  );
}
