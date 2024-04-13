import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={styles.root}>
          <div className={styles.header}>Johnny Bookstore</div>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
