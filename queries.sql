-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT p.ProductName, c.CategoryName
FROM Product as p
INNER JOIN Category as c
ON p.CategoryID = c.Id;


-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.id as OrderID, o.OrderDate, s.CompanyName FROM Orders as o
JOIN Shipper as s
on o.ShipVia = s.id
WHERE o.OrderDate < '2012-08-09' 
ORDER BY o.OrderDate;

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT p.ProductName, p.QuantityPerUnit from OrderDetail as o
JOIN Product as p
ON o.ProductId = p.id
WHERE o.OrderId = '10251'
ORDER BY p.ProductName
LIMIT 3

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.Id as OrderId, c.CompanyName as CustomerCompanyName, e.LastName as EmployeeLastName FROM Orders as o
JOIN Customer as c
ON o.CustomerID = c.id
JOIN Employee as e
ON o.EmployeeId=e.id


-- STRETCH 
--   Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.
-- NOTE: not all categories have 8 reords, so not sure why it's suggestion the answer is 8, unless I'm not understanding the request correctly 
SELECT c.CategoryName, COUNT(c.CategoryID)
FROM Categories as c
JOIN Products as p
ON c.CategoryID = p.CategoryID
where c.CategoryID = 1;

--   Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

SELECT OrderID, COUNT(OrderID) as ItemCount from Orders;