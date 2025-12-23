/**
 * JSON Database - Local file-based database (MongoDB alternative for development)
 * Stores data in JSON files instead of MongoDB
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = path.join(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class JSONDatabase {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.filePath = path.join(DATA_DIR, `${collectionName}.json`);
    this.data = this.load();
  }

  // Load data from file
  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const content = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(content);
      }
      return [];
    } catch (error) {
      console.error(`Error loading ${this.collectionName}:`, error.message);
      return [];
    }
  }

  // Save data to file
  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error(`Error saving ${this.collectionName}:`, error.message);
      return false;
    }
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Find all documents
  findAll() {
    return this.data.filter((item) => item.isActive !== false);
  }

  // Find by query
  find(query = {}) {
    return this.data.filter((item) => {
      if (item.isActive === false && !query.isActive) return false;

      for (let key in query) {
        if (Array.isArray(query[key])) {
          // Handle $in operator for arrays
          if (!query[key].includes(item[key])) return false;
        } else if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  // Find one document
  findOne(query) {
    return this.find(query)[0] || null;
  }

  // Find by ID
  findById(id) {
    return this.data.find((item) => item._id === id || item.id === id) || null;
  }

  // Insert one document
  insertOne(doc) {
    const newDoc = {
      _id: this.generateId(),
      ...doc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.push(newDoc);
    this.save();
    return newDoc;
  }

  // Insert many documents
  insertMany(docs) {
    const newDocs = docs.map((doc) => ({
      _id: this.generateId(),
      ...doc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    this.data.push(...newDocs);
    this.save();
    return newDocs;
  }

  // Update one document
  updateOne(query, update) {
    const index = this.data.findIndex((item) => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });

    if (index !== -1) {
      this.data[index] = {
        ...this.data[index],
        ...update,
        updatedAt: new Date().toISOString(),
      };
      this.save();
      return this.data[index];
    }
    return null;
  }

  // Update by ID
  updateById(id, update) {
    const index = this.data.findIndex((item) => item._id === id || item.id === id);

    if (index !== -1) {
      this.data[index] = {
        ...this.data[index],
        ...update,
        updatedAt: new Date().toISOString(),
      };
      this.save();
      return this.data[index];
    }
    return null;
  }

  // Delete one document (soft delete)
  deleteOne(query) {
    return this.updateOne(query, { isActive: false });
  }

  // Delete by ID (soft delete)
  deleteById(id) {
    return this.updateById(id, { isActive: false });
  }

  // Delete many (soft delete)
  deleteMany(query = {}) {
    let count = 0;
    this.data.forEach((item, index) => {
      let match = true;
      for (let key in query) {
        if (item[key] !== query[key]) {
          match = false;
          break;
        }
      }
      if (match) {
        this.data[index].isActive = false;
        this.data[index].updatedAt = new Date().toISOString();
        count++;
      }
    });
    this.save();
    return count;
  }

  // Hard delete (permanent)
  hardDeleteMany(query = {}) {
    const initialLength = this.data.length;
    this.data = this.data.filter((item) => {
      for (let key in query) {
        if (item[key] === query[key]) return false;
      }
      return true;
    });
    const deleted = initialLength - this.data.length;
    this.save();
    return deleted;
  }

  // Clear all data (for testing/seeding)
  clearAll() {
    this.data = [];
    this.save();
  }

  // Count documents
  count(query = {}) {
    return this.find(query).length;
  }
}

// Export a factory function
const getCollection = (name) => {
  return new JSONDatabase(name);
};

export {
  JSONDatabase,
  getCollection,
};
