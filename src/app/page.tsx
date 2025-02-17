import { database } from "@/db/database";
import { ItemCard } from "@/app/item-card";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">
      Active Bids
      </h1>
        <div className="grid grid-cols-4 gap-8">
      {allItems.map((item) => (<ItemCard key={item.id} item={item} />))}
      </div>
    </main>
  );
}