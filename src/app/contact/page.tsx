"use client";

import Layout from "@/components/Layout";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    // ここに実際のフォーム送信処理を記述
    // 例: APIエンドポイントへのPOSTリクエスト

    // ダミーの送信処理（成功を模擬）
    try {
      // 送信を模擬するための遅延
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 成功したとみなす
      setSubmitSuccess(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      // エラーが発生した場合の処理
      setSubmitError(
        "送信中にエラーが発生しました。後ほど再度お試しください。",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e2ddd5] p-8">
          <h1 className="text-3xl font-bold text-[#2d2926] mb-6 border-b pb-4 border-[#e2ddd5]">
            Contact
          </h1>

          <div className="prose max-w-none mb-8">
            <p className="text-[#3c3732]">
              商品レビューのご依頼やお問い合わせなど、お気軽にご連絡ください。
              内容を確認後、2〜3営業日以内にご返信いたします。
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    送信完了
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      お問い合わせありがとうございます。内容を確認後、ご返信いたします。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        エラー
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{submitError}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#3c3732] mb-1"
                  >
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#d2c6b2] rounded-md focus:ring-[#6f4e37] focus:border-[#6f4e37]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#3c3732] mb-1"
                  >
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#d2c6b2] rounded-md focus:ring-[#6f4e37] focus:border-[#6f4e37]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[#3c3732] mb-1"
                >
                  件名 <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#d2c6b2] rounded-md focus:ring-[#6f4e37] focus:border-[#6f4e37]"
                >
                  <option value="">お選びください</option>
                  <option value="製品レビュー依頼">製品レビュー依頼</option>
                  <option value="取材・メディア掲載">取材・メディア掲載</option>
                  <option value="広告掲載について">広告掲載について</option>
                  <option value="その他お問い合わせ">その他お問い合わせ</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#3c3732] mb-1"
                >
                  メッセージ本文 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#d2c6b2] rounded-md focus:ring-[#6f4e37] focus:border-[#6f4e37]"
                ></textarea>
              </div>

              <div className="text-sm text-[#6f4e37] bg-[#f9f7f5] p-4 rounded-md">
                <p>
                  ※
                  送信いただいた内容に関しては、返信およびお問い合わせ対応以外の目的には使用いたしません。
                </p>
                <p>
                  ※
                  返信まで2〜3営業日いただく場合がございますので、ご了承ください。
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-[#6f4e37] text-white font-medium rounded-md hover:bg-[#5a3e2c] transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      送信中...
                    </span>
                  ) : (
                    "送信する"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
