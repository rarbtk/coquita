-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema coquitaDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema coquitaDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `coquitaDB` ;
USE `coquitaDB` ;

-- -----------------------------------------------------
-- Table `coquitaDB`.`profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coquitaDB`.`profiles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3;


-- -----------------------------------------------------
-- Table `coquitaDB`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coquitaDB`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(100) NULL DEFAULT NULL,
  `lastName` VARCHAR(100) NULL DEFAULT NULL,
  `profile_id` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_users_1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_users_1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `coquitaDB`.`profiles` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 24;


-- -----------------------------------------------------
-- Table `coquitaDB`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coquitaDB`.`carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_carts_1_idx` (`user_id` ASC),
  CONSTRAINT `fk_carts_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `coquitaDB`.`users` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coquitaDB`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coquitaDB`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7;


-- -----------------------------------------------------
-- Table `coquitaDB`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coquitaDB`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` FLOAT NOT NULL,
  `category_id` INT NOT NULL,
  `detail` VARCHAR(100) NULL DEFAULT NULL,
  `image` VARCHAR(100) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_1_idx` (`category_id` ASC),
  CONSTRAINT `fk_products_1`
    FOREIGN KEY (`category_id`)
    REFERENCES `coquitaDB`.`categories` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28;


-- -----------------------------------------------------
-- Table `coquitaDB`.`cart_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coquitaDB`.`cart_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `cart_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cart_items_1_idx` (`cart_id` ASC),
  INDEX `fk_cart_items_2_idx` (`product_id` ASC),
  CONSTRAINT `fk_cart_items_1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `coquitaDB`.`carts` (`id`),
  CONSTRAINT `fk_cart_items_2`
    FOREIGN KEY (`product_id`)
    REFERENCES `coquitaDB`.`products` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coquitaDB`.`password_change_requests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coquitaDB`.`password_change_requests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hash` VARCHAR(100) NOT NULL,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `hash_UNIQUE` (`hash` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
