import React, { useState, useEffect } from 'react';
import './SupplierManagement.css';

const SupplierManagement = () => {
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchOrders();
    fetchSuppliers();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('https://AttendAppApp-backend.cloud-stacks.com/api/services');
      const data = await response.json();
      setServices(data);
    } catch (err) {
      setError('Failed to fetch services');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://AttendAppApp-backend.cloud-stacks.com/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch orders');
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('https://AttendAppApp-backend.cloud-stacks.com/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (err) {
      setError('Failed to fetch suppliers');
    }
  };

  return (
    <div className="supplier-management">
      {error && <div className="error">{error}</div>}
      <div className="services-section">
        <h2>Available Services and Products</h2>
        <div className="services-list">
          {services.map(service => (
            <div key={service.id} className="service-item">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>Price: ${service.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="orders-section">
        <h2>Order Management</h2>
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-item">
              <h3>Order ID: {order.id}</h3>
              <p>Status: {order.status}</p>
              <button>Manage Order</button>
            </div>
          ))}
        </div>
      </div>
      <div className="suppliers-section">
        <h2>Supplier Management</h2>
        <div className="suppliers-list">
          {suppliers.map(supplier => (
            <div key={supplier.id} className="supplier-item">
              <h3>{supplier.name}</h3>
              <p>Email: {supplier.email}</p>
              <p>Address: {supplier.address}</p>
              <p>Phone: {supplier.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;
