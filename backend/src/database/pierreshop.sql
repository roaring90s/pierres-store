-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/02/2025 às 18:46
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `pierreshop`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `total` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cart_product`
--

CREATE TABLE `cart_product` (
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `total` double NOT NULL,
  `paymentMethod` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `order`
--

INSERT INTO `order` (`id`, `name`, `phone`, `email`, `address`, `total`, `paymentMethod`) VALUES
(1, 'John Doe', '123456789', 'john@example.com', 'John\'s Farm', 45, 'C'),
(2, 'John Doe', '123456789', 'john@example.com', 'John\'s Farm', 70, 'C'),
(3, 'Toby Diaz', '8879456123', 'theonethoby@gmail.com', 'Toby\'s Farm', 145, 'D'),
(4, 'Nack Tias', '123789456', 'nack@aot.com', 'Nack Tia\'s Farm', 100, 'C'),
(5, 'El Marco', '6178945612', 'elmarco@delocho.com', 'Mexico City', 1139, 'S');

-- --------------------------------------------------------

--
-- Estrutura para tabela `order_product`
--

CREATE TABLE `order_product` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `order_product`
--

INSERT INTO `order_product` (`order_id`, `product_id`, `quantity`) VALUES
(4, 6, 1),
(4, 7, 1),
(4, 8, 1),
(5, 6, 1),
(5, 34, 1),
(5, 37, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `season` enum('spring','summer','autumn','winter') NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `season`, `image_url`) VALUES
(1, 'Carrot Seeds', 15, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/1/1f/Carrot_Seeds.png'),
(2, 'Garlic Seeds', 20, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/d/d5/Garlic_Seeds.png'),
(3, 'Kale Seeds', 35, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/0/00/Kale_Seeds.png'),
(4, 'Parsnip Seeds', 10, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/d/d3/Parsnip_Seeds.png'),
(5, 'Strawberry Seeds', 100, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/f/f2/Strawberry_Seeds.png'),
(6, 'Blueberry Seeds', 40, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/8/81/Blueberry_Seeds.png'),
(7, 'Melon Seeds', 40, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/5/5e/Melon_Seeds.png'),
(8, 'Pepper Seeds', 20, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/6/67/Pepper_Seeds.png'),
(9, 'Coffee Bean', 22, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/3/33/Coffee_Bean.png'),
(10, 'Tomato Seeds', 25, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/e/e3/Tomato_Seeds.png'),
(11, 'Pumpkin Seeds', 50, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/9/99/Pumpkin_Seeds.png'),
(12, 'Grape Starter', 30, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/d/de/Grape_Starter.png'),
(13, 'Yam Seeds', 30, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/e/e9/Yam_Seeds.png'),
(14, 'Cranberry Seeds', 60, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/e/ec/Cranberry_Seeds.png'),
(15, 'Wheat Seeds', 5, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/2/2b/Wheat_Seeds.png'),
(16, 'Winter Seeds', 30, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/d/dd/Winter_Seeds.png'),
(17, 'Powdermelon Seeds', 20, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/d/de/Powdermelon_Seeds.png'),
(18, 'Fiber Seeds', 5, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/0/05/Fiber_Seeds.png'),
(19, 'Snow Yam', 100, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/3/3f/Snow_Yam.png'),
(20, 'Crystal Fruit', 150, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/1/16/Crystal_Fruit.png'),
(21, 'Apricot Sapling', 500, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/9/9d/Apricot_Sapling.png'),
(22, 'Bean Starter', 60, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/2/26/Bean_Starter.png'),
(23, 'Cauliflower Seeds', 80, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/b/bb/Cauliflower_Seeds.png'),
(24, 'Cherry Sapling', 850, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/2/22/Cherry_Sapling.png'),
(25, 'Jazz Seeds', 30, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/9/95/Jazz_Seeds.png'),
(26, 'Potato Seeds', 50, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/4/44/Potato_Seeds.png'),
(27, 'Rice Shoot', 40, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/8/84/Rice_Shoot.png'),
(28, 'Rhubarb Seeds', 50, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/4/47/Rhubarb_Seeds.png'),
(29, 'Spring Seeds', 105, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/3/39/Spring_Seeds.png'),
(30, 'Tulip Bulb', 20, 'spring', 'https://stardewvalleywiki.com/mediawiki/images/4/42/Tulip_Bulb.png'),
(31, 'Corn Seeds', 150, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/d/d1/Corn_Seeds.png'),
(32, 'Hops Starter', 60, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/9/9b/Hops_Starter.png'),
(33, 'Orange Sapling', 999, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/0/08/Orange_Sapling.png'),
(34, 'Peach Sapling', 999, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/e/e3/Peach_Sapling.png'),
(35, 'Poppy Seeds', 100, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/a/a2/Poppy_Seeds.png'),
(36, 'Radish Seeds', 40, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/b/b1/Radish_Seeds.png'),
(37, 'Red Cabbage Seeds', 100, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/e/ec/Red_Cabbage_Seeds.png'),
(38, 'Spangle Seeds', 50, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/8/85/Spangle_Seeds.png'),
(39, 'Summer Seeds', 150, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/c/c4/Summer_Seeds.png'),
(40, 'Summer Squash Seeds', 200, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/f/fd/Summer_Squash_Seeds.png'),
(41, 'Sunflower Seeds', 200, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/1/1f/Sunflower_Seeds.png'),
(42, 'Starfruit Seeds', 400, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/e/e0/Starfruit_Seeds.png'),
(43, 'Amaranth Seeds', 70, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/c/ca/Amaranth_Seeds.png'),
(44, 'Apple Sapling', 999, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/6/68/Apple_Sapling.png'),
(45, 'Artichoke Seeds', 32, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/7/71/Artichoke_Seeds.png'),
(46, 'Beet Seeds', 20, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/a/a8/Beet_Seeds.png'),
(47, 'Bok Choy Seeds', 50, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/2/21/Bok_Choy_Seeds.png'),
(48, 'Broccoli Seeds', 60, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/9/97/Broccoli_Seeds.png'),
(49, 'Eggplant Seeds', 20, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/f/f9/Eggplant_Seeds.png'),
(50, 'Fairy Seeds', 200, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/8/8e/Fairy_Seeds.png'),
(51, 'Autumn Seeds', 250, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/5/55/Fall_Seeds.png'),
(52, 'Pomegranate Sapling', 999, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/1/10/Pomegranate_Sapling.png'),
(53, 'Rare Seed', 400, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/5/5b/Rare_Seed.png'),
(54, 'Sunflower Seeds', 200, 'autumn', 'https://stardewvalleywiki.com/mediawiki/images/1/1f/Sunflower_Seeds.png'),
(55, 'Acorn', 50, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/c/cd/Acorn.png'),
(56, 'Ancient Seeds', 60, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/e/ec/Ancient_Seeds.png'),
(57, 'Cactus Seeds', 150, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/0/09/Cactus_Seeds.png'),
(58, 'Mahogany Seed', 100, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/8/84/Mahogany_Seed.png'),
(59, 'Mossy Seed', 150, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/7/78/Mossy_Seed.png'),
(60, 'Mushroom Tree Seed', 280, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/d/d4/Mushroom_Tree_Seed.png'),
(61, 'Mystic Tree Seed', 420, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/f/ff/Mystic_Tree_Seed.png'),
(62, 'Pineapple Seeds', 320, 'summer', 'https://stardewvalleywiki.com/mediawiki/images/1/17/Pineapple_Seeds.png'),
(63, 'Qi Bean', 20, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/a/a7/Qi_Bean.png'),
(64, 'Tea Sapling', 20, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/1/12/Tea_Sapling.png'),
(65, 'Pine Cone', 35, 'winter', 'https://stardewvalleywiki.com/mediawiki/images/9/90/Pine_Cone.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `receipt`
--

CREATE TABLE `receipt` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `totalAmount` float NOT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `receipt`
--

INSERT INTO `receipt` (`id`, `order_id`, `totalAmount`, `date`) VALUES
(1, 2, 70, '2025-02-20 11:32:19'),
(2, 3, 145, '2025-02-20 11:54:57'),
(3, 4, 100, '2025-02-20 12:09:55'),
(4, 5, 1139, '2025-02-20 13:10:07');

-- --------------------------------------------------------

--
-- Estrutura para tabela `salesdata`
--

CREATE TABLE `salesdata` (
  `id` int(11) NOT NULL,
  `season` varchar(50) NOT NULL,
  `totalSales` int(11) NOT NULL DEFAULT 0,
  `salesCount` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `cart_product`
--
ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`cart_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Índices de tabela `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Índices de tabela `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Índices de tabela `salesdata`
--
ALTER TABLE `salesdata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `season` (`season`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de tabela `receipt`
--
ALTER TABLE `receipt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `salesdata`
--
ALTER TABLE `salesdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `cart_product`
--
ALTER TABLE `cart_product`
  ADD CONSTRAINT `cart_product_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `receipt_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
