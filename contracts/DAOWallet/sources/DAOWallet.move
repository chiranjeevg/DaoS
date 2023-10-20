// SPDX-License-Identifier: Apache-2.0

module daowallet::DAOWallet{
  use std::vector;
  use std::string;

  use sui::coin::{Self, Coin};
  use sui::object::{Self, UID};
  use sui::transfer;
  use sui::vec_map::{Self, VecMap};
  use sui::tx_context::{Self, TxContext};
  use sui::balance::{Self, Balance, Supply};
  use sui::sui::SUI;

  struct Wallet has key{
    id: UID,
    owner: address,
    name: string::String,
    description: string::String,
    approval_threshold: u8,
    cancellation_threshold: u8,
    sui:Balance<SUI>,
    members: VecMap<address, bool>,
    tokenProposals: vector<TokenProposal>,
  }

  struct Member has key{
    id: UID,
    wallet: object::ID,
  }

  struct Proposal has store {
    id: UID,
    creator: address,
    votes: VecMap<address, bool>,
    approval_votes: u64,
    cancellation_votes: u64,
  }

  struct TokenProposal has store {
    proposal: Proposal,
    to: address,
    amount: u64,
  }

  public entry fun create_wallet(name:vector<u8>, description:vector<u8>, approval_threshold: u8, cancellation_threshold: u8, ctx: &mut TxContext) {
        // create multisig resource
        let wallet = Wallet {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            approval_threshold,
            cancellation_threshold,
            sui:balance::zero<SUI>(),
            members: vec_map::empty(),
            tokenProposals: vector::empty(),
        };
        // while (!vector::is_empty(&participants)) {
        //     let participant = vector::pop_back(&mut participants);
        //     vec_map::insert(&mut wallet.participants, participant, true);
        // };

        vec_map::insert(&mut wallet.members, tx_context::sender(ctx), true);
        transfer::share_object(wallet)
  }

  public entry fun add_member(wallet: &mut Wallet,new_member: address, name: vector<u8>, ctx: &mut TxContext){
    vec_map::insert(&mut wallet.members, new_member, true);
    transfer::transfer(Member {
      id: object::new(ctx),
      wallet: object::id(wallet),
    },new_member);
  }

  public entry fun donate(wallet: &mut Wallet,sui: Coin<SUI>){
    coin::put(&mut wallet.sui, sui);
  }

  public entry fun create_token_praposal(wallet: &mut Wallet, to: address, amount: u64, ctx: &mut TxContext){
    let tokenProposal = TokenProposal {
      proposal: Proposal {
        id: object::new(ctx),
        creator: tx_context::sender(ctx),
        votes: vec_map::empty(),
        approval_votes:1,
        cancellation_votes:0,
      },
      to: to,
      amount: amount,
    };
    vec_map::insert(&mut tokenProposal.proposal.votes, tx_context::sender(ctx), true);
    vector::push_back(&mut wallet.tokenProposals, tokenProposal);
  }

  public entry fun approve(wallet: &mut Wallet, proposal_id: u64, ctx: &mut TxContext){
    assert!(proposal_id < vector::length(&mut wallet.tokenProposals),1);
    let tokenProposal = vector::borrow_mut(&mut wallet.tokenProposals, proposal_id);

    let proposal = &mut tokenProposal.proposal;
    let sender = tx_context::sender(ctx);
    assert!(vec_map::contains(&proposal.votes,&sender),2);
    proposal.approval_votes = proposal.approval_votes + 1;
    vec_map::insert(&mut proposal.votes, tx_context::sender(ctx), true);
  }

}