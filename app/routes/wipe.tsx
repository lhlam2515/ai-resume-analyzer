import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import type { Route } from "./+types/wipe";

import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Wipe" },
    { name: "description", content: "Wipe all app data" },
  ];
}

const Wipe = () => {
  const { auth, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [deletingFiles, setDeletingFiles] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [auth.isAuthenticated]);

  const loadFiles = async () => {
    setLoadingFiles(true);

    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);

    setLoadingFiles(false);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleDelete = async () => {
    setDeletingFiles(true);

    files.forEach(async (file) => {
      await fs.delete(file.path);
    });

    await kv.flush();
    loadFiles();

    setDeletingFiles(false);
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Wipe Your Applications & Resume Data</h1>
          {!deletingFiles && files.length === 0 ? (
            <h2>All your resume data has been successfully wiped!</h2>
          ) : (
            <h2>This will wipe all your resume data from the application.</h2>
          )}
        </div>

        {loadingFiles && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" alt="" className="w-[200px]" />
          </div>
        )}

        {!loadingFiles && deletingFiles && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" alt="" className="w-[200px]" />
            <p className="text-dark-200 mt-4 text-xl">Wiping data...</p>
          </div>
        )}

        {!loadingFiles && !deletingFiles && files.length > 0 && (
          <div className="flex w-full max-w-2xl flex-col items-center gap-8">
            <div className="gradient-border w-full">
              <div className="w-full rounded-xl bg-white p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Authenticated as: {auth.user?.username}
                </h3>
                <div className="text-dark-200 mb-4">
                  Existing files ({files.length}):
                </div>
                <div className="mb-6 max-h-[300px] overflow-y-auto rounded-lg bg-gray-50 p-4">
                  <div className="flex flex-col gap-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex flex-row gap-4 border-b border-gray-100 p-2"
                      >
                        <p>{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="primary-button"
                    onClick={() => handleDelete()}
                    disabled={files.length === 0}
                  >
                    Wipe All Data
                  </button>
                </div>
              </div>
            </div>
            <div className="text-dark-200 text-center">
              <p>Warning: This action cannot be undone.</p>
            </div>
          </div>
        )}

        {!loadingFiles && !deletingFiles && files.length === 0 && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Link to="/" className="primary-button w-fit text-xl font-semibold">
              Return to Homepage
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Wipe;
