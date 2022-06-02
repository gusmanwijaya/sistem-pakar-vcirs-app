import { useRouter } from "next/router";
import Pagination from "../Pagination";

const LayoutTable = ({
  thead = [],
  tbody = [],
  data = [],
  urlTambah,
  urlDetail,
  urlUbah,
  handleDelete,
  withoutPagination,
  page,
  handlePrevious,
  handleNext,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-center items-start space-y-4">
        <button
          onClick={() => {
            router.push(urlTambah);
          }}
          className="btn btn-xs btn-outline btn-info capitalize"
        >
          Tambah
        </button>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                {thead.map((value, index) => (
                  <th key={index}>{value}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((value, index) => (
                  <tr key={index}>
                    {Object.keys(value).map(
                      (key) =>
                        tbody.indexOf(key) > -1 && (
                          <td key={key} className="w-1/6">
                            {value[key]}
                          </td>
                        )
                    )}
                    <th className="w-1/12">
                      <div className="flex flex-row justify-center items-center space-x-1">
                        {urlDetail && (
                          <button
                            onClick={() => {
                              router.push(`${urlDetail}/${value?._id}`);
                            }}
                            className="btn btn-ghost btn-xs capitalize"
                          >
                            Detail
                          </button>
                        )}
                        {urlUbah && (
                          <button
                            onClick={() => {
                              router.push(`${urlUbah}/${value?._id}`);
                            }}
                            className="btn btn-ghost btn-xs capitalize text-orange-500"
                          >
                            Ubah
                          </button>
                        )}
                        {handleDelete && (
                          <button
                            onClick={() => handleDelete(value?._id)}
                            className="btn btn-ghost btn-xs capitalize text-red-500"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {!withoutPagination && data.length && (
          <Pagination
            page={page}
            handlePrevious={() => handlePrevious()}
            handleNext={() => handleNext()}
          />
        )}
      </div>
    </>
  );
};

export default LayoutTable;
