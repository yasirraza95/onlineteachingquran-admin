import React from "react";

export default function AdminFooter() {
  return (
    <footer className="text-center admin-footer">
      <div className="container">
        <span>
          © Copyrights {new Date().getFullYear()} all rights reserved.
        </span>
      </div>
    </footer>
  );
}
