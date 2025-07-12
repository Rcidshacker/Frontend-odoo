"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { User, users, currentUser } from "@/lib/mock-data";
import UserCard from "@/components/user-card";
import PaginationControls from "@/components/pagination-controls";
import RequestSwapModal from "@/components/request-swap-modal";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const otherUsers = users.filter((user) => user.id !== currentUser.id);

  const filteredUsers = useMemo(() => {
    return otherUsers
      .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((user) => {
        if (availabilityFilter === "all") return true;
        return user.availability.some(
          (a) => a.toLowerCase() === availabilityFilter
        );
      });
  }, [otherUsers, searchTerm, availabilityFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRequestSwap = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold text-primary">Find Your Skill Swap</h1>
        <p className="text-muted-foreground text-lg">
          Connect with talented individuals to learn and share skills.
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-10 bg-white dark:bg-muted"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Select
          value={availabilityFilter}
          onValueChange={(value) => {
            setAvailabilityFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-muted">
            <SelectValue placeholder="Filter by availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Availabilities</SelectItem>
            <SelectItem value="weekends">Weekends</SelectItem>
            <SelectItem value="evenings">Evenings</SelectItem>
            <SelectItem value="weekdays">Weekdays</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {paginatedUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onRequestSwap={() => handleRequestSwap(user)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No users found. Try adjusting your search.</p>
        </div>
      )}


      {totalPages > 1 && (
        <div className="mt-8">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {selectedUser && (
        <RequestSwapModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          userToSwap={selectedUser}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
