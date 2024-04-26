import AccountForm from "./account-form";
import AccountList from "./account-list";

function AccountsPage() {
  return (
    <div className="flex h-full flex-col gap-4 sm:flex-row">
      <section className="w-full sm:w-1/3">
        <AccountForm />
      </section>

      <AccountList />
    </div>
  );
}

export default AccountsPage;
