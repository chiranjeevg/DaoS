// SPDX-License-Identifier: Apache-2.0

module daowallet::DAOWallet{
  use std::vector;
  use std::string;

  use sui::coin::{Self, Coin};
  use sui::object::{Self, UID};
  use sui::transfer;
  use sui::vec_map::{Self, VecMap};
  use sui::tx_context::{Self, TxContext};

  struct Member has store {
    id:UID,
    owner:address,
    name:string::String,
  }

  struct Wallet has key{
    id: UID,
    owner: address,
    name: string::String,
    description: string::String,
    approval_threshold: u8,
    cancellation_threshold: u8,
    participants: VecMap<address, bool>,
    proposals: vector<Proposal>,
  }

  struct Proposal has store {
    creator: address,
    posted: bool,
    votes: VecMap<address, bool>,
    approval_votes: u64,
    cancellation_votes: u64,
  }

  public entry fun create_wallet(name:vector<u8>, description:vector<u8>, participant: address, approval_threshold: u8, cancellation_threshold: u8, ctx: &mut TxContext) {
        // create multisig resource
        let wallet = Wallet {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            approval_threshold,
            cancellation_threshold,
            participants: vec_map::empty(),
            proposals: vector::empty()
        };
        // while (!vector::is_empty(&participants)) {
        //     let participant = vector::pop_back(&mut participants);
        //     vec_map::insert(&mut wallet.participants, participant, true);
        // };

        vec_map::insert(&mut wallet.participants, participant, true);
        transfer::share_object(wallet)
  }

  public fun get_wallet(self: &Wallet): (&address, &string::String, &string::String, &u8, &u8, &VecMap<address, bool>, &vector<Proposal> ){
    (&self.owner, &self.name, &self.description, &self.approval_threshold, &self.cancellation_threshold, &self.participants, &self.proposals )
  }

}