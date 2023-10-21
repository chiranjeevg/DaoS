import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
                <div className="flex items-center justify-center px-5 text-gray-700">
                    <div className="flex w-full flex-col space-y-2">
                        <div className="font-dark text-7xl font-bold">404</div>
                        <p className="text-2xl font-light leading-normal">
                            Sorry we couldn&apos;t find this page.
                        </p>
                        <p className="mb-8 text-lg">
                            But dont worry, you can find plenty of other things
                            on our homepage.
                        </p>
                        <div className="flex w-full space-x-3 pt-10">
                            <a href={`/`}>
                                <button className="inline-block rounded bg-lime-600 px-8 py-3 text-base font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-lime-500 mt-5 w-full">
                                    Home
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
