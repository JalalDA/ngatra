import Header from "../_components/Header";
import Table from "../_components/Table";


export default function Dripfeed() {
    return (
        <div className="h-screen w-screen bg-gray-50">
            <Header />
            <div className="flex items-center justify-center flex-col mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dreep Feed</h1>
                <div className="max-w-screen-lg w-full">
                    <Table />
                </div>
            </div>
        </div>
    );
}