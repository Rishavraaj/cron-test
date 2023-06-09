import { fetchAsanaApi } from "@/api/api";
import CompanyCard from "./CompanyCard";
import useFetch from "@/services/useFetch";
import Async from "./Async";

const CompanyDetails = () => {
  const { loading, data, error } = useFetch("workspaces", fetchAsanaApi);
  return (
    <Async
      isLoading={loading}
      isError={error}
      onSuccess={
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          {data.length > 0 &&
            data.map((items) => (
              <div key={items.gid}>
                {items && <CompanyCard items={items} />}
              </div>
            ))}
        </div>
      }
    />
  );
};

export default CompanyDetails;
