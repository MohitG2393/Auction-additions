"use client";

import { Button } from "@/components/ui/button";
import { formatToDollar } from "@/util/currency";
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  const userId = session?.data?.user?.id;

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo2.svg" width="50" height="50" alt="Logo" />
            My Trading Kart
          </Link>

      

          <div className="flex items-center gap-8">
            <Link href="/" className="hover:underline flex items-center gap-1">
              All Auctions
            </Link>

             
            <Link href="/homeonly" className="hover:underline flex items-center gap-1">
              Secondary Home
            </Link>

            {userId && (
              <>

                 

                <Link
                  href="/bids/create"
                  className="hover:underline flex items-center gap-1"
                >
                  Create Auction
                </Link>

                <Link
                  href="/auctions"
                  className="hover:underline flex items-center gap-1"
                >
                  My Auctions
                </Link>
                <input
            type="text"
            className="px-1 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search..."
          />
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {userId && (
            <>
              <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notifButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                renderItem={({ item, ...props }) => (
                  <NotificationCell {...props} item={item}>
                    <div className="rounded-xl">
                      <Link
                        className="text-blue-400 hover:text=blue-500"
                        onClick={() => {
                          setIsVisible(false);
                        }}
                        href={`/bids/${item.data?.itemId}`}
                      >
                        Someone outbidded you on{" "}
                        <span className="font-bold">{item.data?.itemName}</span>{" "}
                        by ${formatToDollar(item.data?.bidAmount)}
                      </Link>
                    </div>
                  </NotificationCell>
                )}
              />
            </>
          )}

          {session?.data?.user.image && (
            <Image
              src={session.data.user.image}
              width="40"
              height="40"
              alt="user avatar"
              className="rounded-full"
            />
          )}
          <div>{session?.data?.user?.name}</div>
          <div>
            {userId ? (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Sign Out
              </Button>
            ) : (
              <Button type="submit" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
          <div className="relative w-full max-w-md">
        </div>
        </div>
      </div>
    </div>
  );
}
