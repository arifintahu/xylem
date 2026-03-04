import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { BlockDetails } from './pages/BlockDetails';
import { TransactionDetails } from './pages/TransactionDetails';
import { AddressDetails } from './pages/AddressDetails';
import { Providers } from './Providers';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="block/:blockNumber" element={<BlockDetails />} />
            <Route path="tx/:txHash" element={<TransactionDetails />} />
            <Route path="address/:address" element={<AddressDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
